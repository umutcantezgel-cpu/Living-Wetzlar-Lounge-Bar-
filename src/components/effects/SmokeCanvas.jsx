import React, { useEffect, useRef, memo } from 'react';
import { prefersReducedMotion } from '../../utils';

const SmokeCanvas = memo(() => {
    const canvasRef = useRef(null);
    const emittersRef = useRef([]);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(Date.now());

    useEffect(() => {
        // Skip if user prefers reduced motion
        if (prefersReducedMotion()) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Simplified smoke particle
        class SmokeParticle {
            constructor(x, y, color, size) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = -Math.random() * 1.5 - 0.5;
                this.color = color;
                this.size = size;
                this.maxSize = size * 2.5;
                this.opacity = 1;
                this.age = 0;
                this.maxAge = 3000;
            }

            update(deltaTime) {
                this.x += this.vx;
                this.y += this.vy;
                this.vy *= 0.98;
                this.vy -= 0.03;
                this.vx += (Math.random() - 0.5) * 0.2;
                this.size = Math.min(this.size + 0.08, this.maxSize);
                this.age += deltaTime;
                this.opacity = Math.max(0, 1 - (this.age / this.maxAge));
            }

            draw(ctx) {
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');

                ctx.globalAlpha = this.opacity * 0.6;
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    this.x - this.size,
                    this.y - this.size,
                    this.size * 2,
                    this.size * 2
                );
            }

            isAlive() {
                return this.age < this.maxAge;
            }
        }

        // Simplified smoke emitter
        class SmokeEmitter {
            constructor(x, y, color = '#00FFFF', emissionRate = 3, intensity = 1) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.particles = [];
                this.emissionRate = emissionRate;
                this.active = true;
                this.intensity = intensity;
                this.lifetime = 0;
                this.maxLifetime = 2000; // Auto-cleanup after 2 seconds
            }

            emit(count = this.emissionRate) {
                if (!this.active) return;

                for (let i = 0; i < count * this.intensity; i++) {
                    const size = Math.random() * 15 + 8;
                    const particle = new SmokeParticle(
                        this.x + (Math.random() - 0.5) * 20,
                        this.y,
                        this.color,
                        size
                    );
                    this.particles.push(particle);
                }
            }

            update(deltaTime) {
                this.lifetime += deltaTime;

                // Auto-deactivate after maxLifetime
                if (this.lifetime > this.maxLifetime) {
                    this.active = false;
                }

                for (let i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].update(deltaTime);
                    if (!this.particles[i].isAlive()) {
                        this.particles.splice(i, 1);
                    }
                }
            }

            draw(ctx) {
                this.particles.forEach(particle => particle.draw(ctx));
            }

            isDead() {
                return !this.active && this.particles.length === 0;
            }
        }

        // Animation loop (throttled to 30fps)
        const animate = () => {
            const now = Date.now();
            const deltaTime = now - lastTimeRef.current;

            // Limit to 30fps
            if (deltaTime < 33) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            lastTimeRef.current = now;

            // Clear with fade
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw emitters, remove dead ones
            for (let i = emittersRef.current.length - 1; i >= 0; i--) {
                const emitter = emittersRef.current[i];
                if (emitter.active) {
                    emitter.emit();
                }
                emitter.update(deltaTime);
                emitter.draw(ctx);

                // Remove dead emitters
                if (emitter.isDead()) {
                    emittersRef.current.splice(i, 1);
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Expose method to add emitters (limited)
        window.addSmokeEmitter = (x, y, color = '#00FFFF', emissionRate = 3, intensity = 1) => {
            // Limit total emitters to prevent performance issues
            if (emittersRef.current.length >= 10) {
                return null;
            }

            const emitter = new SmokeEmitter(x, y, color, emissionRate, intensity);
            emittersRef.current.push(emitter);
            return emitter;
        };

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            delete window.addSmokeEmitter;
            emittersRef.current = [];
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1, opacity: 0.3 }}
            aria-hidden="true"
        />
    );
});

SmokeCanvas.displayName = 'SmokeCanvas';

export default SmokeCanvas;
