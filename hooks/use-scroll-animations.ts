/**
 * Scroll Animation Hooks
 *
 * Custom hooks for scroll-based animations including parallax,
 * reveal effects, and progress indicators.
 */

"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Scroll progress hook
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollYProgress, scaleX };
}

// Element in view hook with intersection observer
interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin, hasBeenInView]);

  return options.once ? hasBeenInView : isInView;
}

// Parallax scroll hook
interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, offset = 0 } = options;
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [offset, offset + 1000 * speed]);

  return { y, scrollY };
}

// Scroll-triggered animations hook
interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(
  ref: RefObject<Element>,
  options: UseScrollAnimationOptions = {}
) {
  const isInView = useInView(ref, options);
  const [animationState, setAnimationState] = useState<"hidden" | "visible">(
    "hidden"
  );

  useEffect(() => {
    if (isInView) {
      setAnimationState("visible");
    } else if (!options.once) {
      setAnimationState("hidden");
    }
  }, [isInView, options.once]);

  return { isInView, animationState };
}

// Stagger animation hook for lists
export function useStaggerAnimation(itemCount: number, delay: number = 0.1) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const triggerStagger = () => {
    setVisibleItems([]);

    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, i * delay * 1000);
    }
  };

  return { visibleItems, triggerStagger };
}

// Scroll velocity hook
export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const unsubscribe = scrollY.onChange((current) => {
      const now = Date.now();
      const timeDelta = now - lastTime.current;
      const scrollDelta = current - lastScrollY.current;

      if (timeDelta > 0) {
        const currentVelocity = scrollDelta / timeDelta;
        setVelocity(currentVelocity);
      }

      lastScrollY.current = current;
      lastTime.current = now;
    });

    return unsubscribe;
  }, [scrollY]);

  return velocity;
}

// Scroll direction hook
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
}

// Element scroll progress hook
export function useElementScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return scrollYProgress;
}

// Smooth scroll hook
export function useSmoothScroll() {
  const scrollTo = (target: string | number, options?: ScrollToOptions) => {
    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          ...options,
        });
      }
    } else {
      window.scrollTo({
        top: target,
        behavior: "smooth",
        ...options,
      });
    }
  };

  return { scrollTo };
}

// Scroll lock hook (for modals)
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isLocked]);
}

// Reduced motion preference hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Animation frame hook for custom animations
export function useAnimationFrame(
  callback: (time: number) => void,
  deps: any[] = []
) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      callback(time - previousTimeRef.current);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

// Export all scroll animation hooks
export const ScrollAnimations = {
  useScrollProgress,
  useInView,
  useParallax,
  useScrollAnimation,
  useStaggerAnimation,
  useScrollVelocity,
  useScrollDirection,
  useElementScrollProgress,
  useSmoothScroll,
  useScrollLock,
  useReducedMotion,
  useAnimationFrame,
};
