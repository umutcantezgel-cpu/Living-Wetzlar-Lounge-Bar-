import React, { useEffect, useRef, memo } from 'react';
import { prefersReducedMotion } from '../../utils';

const CyberpunkBackground = memo(() => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const geometryRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Skip if user prefers reduced motion
        if (prefersReducedMotion()) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Particle class (optimized)
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = ['#FF00FF', '#00FFFF', '#00FF00', '#FFD700'][Math.floor(Math.random() * 4)];
                this.opacity = Math.random() * 0.5 + 0.2;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update(mouseX, mouseY) {
                const dx = (mouseX - canvas.width / 2) * 0.0005;
                const dy = (mouseY - canvas.height / 2) * 0.0005;

                this.x += this.vx + dx;
                this.y += this.vy + dy;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                this.pulsePhase += 0.02;
            }

            draw(ctx) {
                const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.5;
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Geometric shape class (optimized)
        class GeometricShape {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 80 + 40;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.005;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.opacity = Math.random() * 0.08 + 0.02;
                this.type = Math.floor(Math.random() * 3);
                this.color = ['#FF00FF', '#00FFFF', '#9D00FF'][Math.floor(Math.random() * 3)];
            }

            update(mouseX, mouseY) {
                const dx = (mouseX - canvas.width / 2) * 0.001;
                const dy = (mouseY - canvas.height / 2) * 0.001;

                this.x += this.vx + dx;
                this.y += this.vy + dy;
                this.rotation += this.rotationSpeed;

                // Wrap around
                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
            }

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;

                ctx.beginPath();
                if (this.type === 0) {
                    // Triangle
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.closePath();
                } else if (this.type === 1) {
                    // Square
                    ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
                } else {
                    // Hexagon
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const x = Math.cos(angle) * this.size / 2;
                        const y = Math.sin(angle) * this.size / 2;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        // Initialize particles (reduced count for performance)
        const particleCount = 30;
        const geometryCount = 4;

        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(new Particle());
        }

        for (let i = 0; i < geometryCount; i++) {
            geometryRef.current.push(new GeometricShape());
        }

        // Mouse tracking (throttled)
        let mouseMoveTimeout;
        const handleMouseMove = (e) => {
            if (mouseMoveTimeout) return;
            mouseMoveTimeout = setTimeout(() => {
                mouseRef.current = { x: e.clientX, y: e.clientY };
                mouseMoveTimeout = null;
            }, 50);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Animation loop
        let lastTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const deltaTime = now - lastTime;

            // Limit frame rate to 30fps for better performance
            if (deltaTime < 33) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            lastTime = now;

            // Clear with fade
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            // Update and draw
            geometryRef.current.forEach(shape => {
                shape.update(mouseX, mouseY);
                shape.draw(ctx);
            });

            particlesRef.current.forEach(particle => {
                particle.update(mouseX, mouseY);
                particle.draw(ctx);
            });

            // Draw connecting lines (limited)
            ctx.globalAlpha = 0.08;
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                    if (distance < 120) {
                        ctx.strokeStyle = '#00FFFF';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            resizeCanvas();
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            particlesRef.current = [];
            geometryRef.current = [];
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, opacity: 0.15 }}
            aria-hidden="true"
        />
    );
});

CyberpunkBackground.displayName = 'CyberpunkBackground';

export default CyberpunkBackground;
