'use client';

import { useState, useCallback, useRef, TouchEvent } from 'react';

interface UsePullToRefreshOptions {
    onRefresh: () => Promise<void> | void;
    threshold?: number;
}

export function usePullToRefresh({ onRefresh, threshold = 80 }: UsePullToRefreshOptions) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const startY = useRef(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (window.scrollY === 0) {
            startY.current = e.touches[0].clientY;
        }
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (window.scrollY > 0 || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = currentY - startY.current;

        if (distance > 0) {
            // Add resistance
            const resistedDistance = Math.min(distance * 0.5, threshold * 1.5);
            setPullDistance(resistedDistance);
        }
    }, [isRefreshing, threshold]);

    const handleTouchEnd = useCallback(async () => {
        if (pullDistance > threshold && !isRefreshing) {
            setIsRefreshing(true);
            try {
                await onRefresh();
                setTimeout(() => {
                    setIsRefreshing(false);
                    setPullDistance(0);
                }, 500);
            } catch (error) {
                setIsRefreshing(false);
                setPullDistance(0);
            }
        } else {
            setPullDistance(0);
        }
    }, [pullDistance, threshold, isRefreshing, onRefresh]);

    const progress = Math.min(pullDistance / threshold, 1);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isRefreshing,
        pullDistance,
        progress,
    };
}
