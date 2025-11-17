import React, { useEffect, useRef } from 'react';

export default function CyberpunkBackground() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);
    const geometryRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class FloatingParticle {
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
                const dx = (mouseX - canvas.width / 2) * 0.001;
                const dy = (mouseY - canvas.height / 2) * 0.001;

                this.x += this.vx + dx;
                this.y += this.vy + dy;

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
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;

                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
        }

        class GeometricShape {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 100 + 50;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.1 + 0.05;
                this.type = Math.floor(Math.random() * 3);
                this.color = ['#FF00FF', '#00FFFF', '#9D00FF'][Math.floor(Math.random() * 3)];
            }

            update(mouseX, mouseY) {
                const dx = (mouseX - canvas.width / 2) * 0.002;
                const dy = (mouseY - canvas.height / 2) * 0.002;

                this.x += this.vx + dx;
                this.y += this.vy + dy;
                this.rotation += this.rotationSpeed;

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
                ctx.lineWidth = 2;
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                ctx.beginPath();

                if (this.type === 0) {
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.closePath();
                } else if (this.type === 1) {
                    ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
                } else {
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

                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
        }

        const particleCount = 50;
        const geometryCount = 5;

        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(new FloatingParticle());
        }

        for (let i = 0; i < geometryCount; i++) {
            geometryRef.current.push(new GeometricShape());
        }

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        function animate() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            geometryRef.current.forEach(shape => {
                shape.update(mouseX, mouseY);
                shape.draw(ctx);
            });

            particlesRef.current.forEach(particle => {
                particle.update(mouseX, mouseY);
                particle.draw(ctx);
            });

            ctx.globalAlpha = 0.1;
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                    if (distance < 150) {
                        ctx.strokeStyle = '#00FFFF';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
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
}
