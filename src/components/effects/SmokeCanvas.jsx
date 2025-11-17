import React, { useEffect, useRef } from 'react';

export default function SmokeCanvas({ fadeAmount = 0.05, backgroundColor = 'rgba(10, 14, 39, 0.05)' }) {
    const canvasRef = useRef(null);
    const emittersRef = useRef([]);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(Date.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class SmokeParticle {
            constructor(x, y, color, size) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = -Math.random() * 2 - 1;
                this.color = color;
                this.size = size;
                this.maxSize = size * 3;
                this.opacity = 1;
                this.age = 0;
                this.maxAge = 4000;
            }

            update(deltaTime) {
                this.x += this.vx;
                this.y += this.vy;
                this.vy *= 0.98;
                this.vy -= 0.05;
                this.vx += (Math.random() - 0.5) * 0.3;
                this.size = Math.min(this.size + 0.1, this.maxSize);
                this.age += deltaTime;
                this.opacity = Math.max(0, 1 - (this.age / this.maxAge));
            }

            draw(ctx) {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');

                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                ctx.fillStyle = gradient;
                ctx.globalAlpha = this.opacity;
                ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }

            isAlive() {
                return this.age < this.maxAge;
            }
        }

        function animate() {
            const now = Date.now();
            const deltaTime = now - lastTimeRef.current;
            lastTimeRef.current = now;

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            emittersRef.current.forEach(emitter => {
                if (emitter.active) emitter.emit();
                emitter.update(deltaTime);
                emitter.draw(ctx);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [backgroundColor]);

    useEffect(() => {
        window.addSmokeEmitter = (x, y, color, emissionRate, intensity) => {
            const emitter = {
                x,
                y,
                color: color || '#00FFFF',
                particles: [],
                emissionRate: emissionRate || 5,
                active: true,
                intensity: intensity || 1,
                emit: function(count = this.emissionRate) {
                    if (!this.active) return;
                    for (let i = 0; i < count * this.intensity; i++) {
                        const size = Math.random() * 20 + 10;
                        this.particles.push(new SmokeParticle(
                            this.x + (Math.random() - 0.5) * 30,
                            this.y,
                            this.color,
                            size
                        ));
                    }
                },
                update: function(deltaTime) {
                    for (let i = this.particles.length - 1; i >= 0; i--) {
                        this.particles[i].update(deltaTime);
                        if (!this.particles[i].isAlive()) {
                            this.particles.splice(i, 1);
                        }
                    }
                },
                draw: function(ctx) {
                    this.particles.forEach(p => p.draw(ctx));
                }
            };

            emittersRef.current.push(emitter);
            return emitter;
        };

        return () => {
            delete window.addSmokeEmitter;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1, opacity: 0.4 }}
            aria-hidden="true"
        />
    );
}
