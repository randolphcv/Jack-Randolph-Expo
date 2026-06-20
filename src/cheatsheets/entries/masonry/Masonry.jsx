import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const index = queries.findIndex(query => window.matchMedia(query).matches);
    return values[index] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQueries = queries.map(query => window.matchMedia(query));
    const handler = () => setValue(get());

    mediaQueries.forEach(mediaQuery => mediaQuery.addEventListener('change', handler));
    return () => mediaQueries.forEach(mediaQuery => mediaQuery.removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const image = new Image();
          image.src = src;
          image.onload = image.onerror = () => resolve();
        }),
    ),
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(item => item.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, totalHeight } = useMemo(() => {
    if (!width) return { grid: [], totalHeight: 0 };

    const columnHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const layout = items.map(item => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = columnWidth * column;
      const height = item.height / 2;
      const y = columnHeights[column];

      columnHeights[column] += height;

      return { ...item, x, y, w: columnWidth, h: height };
    });

    return {
      grid: layout,
      totalHeight: Math.max(...columnHeights, 0),
    };
  }, [columns, items, width]);

  const animatedIds = useRef(new Set());

  useLayoutEffect(() => {
    if (!imagesReady) return;

    const scopedSelector = gsap.utils.selector(containerRef);
    const liveIds = new Set(grid.map(item => item.id));

    animatedIds.current.forEach(id => {
      if (!liveIds.has(id)) animatedIds.current.delete(id);
    });

    grid.forEach((item, index) => {
      const element = scopedSelector(`[data-key="${item.id}"]`)[0];
      if (!element) return;

      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!animatedIds.current.has(item.id)) {
        const initialPosition = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPosition.x,
          y: initialPosition.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' }),
        };

        gsap.fromTo(element, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger,
        });

        animatedIds.current.add(item.id);
      } else {
        gsap.to(element, {
          ...animationProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    });
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (event, item) => {
    const element = event.currentTarget;

    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (event, item) => {
    const element = event.currentTarget;

    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list" style={{ height: `${Math.max(totalHeight, 1)}px` }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={event => handleMouseEnter(event, item)}
          onMouseLeave={event => handleMouseLeave(event, item)}
        >
          <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
            {colorShiftOnHover ? (
              <div
                className="color-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                  opacity: 0,
                  pointerEvents: 'none',
                  borderRadius: '8px',
                }}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
