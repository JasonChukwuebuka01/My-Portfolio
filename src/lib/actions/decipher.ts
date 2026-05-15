import type { Action } from 'svelte/action';

interface DecipherParams {
    text?: string;
    duration?: number;
    delay?: number;
}

export const decipher: Action<HTMLElement, DecipherParams | undefined> = (node, params) => {
    const targetText = params?.text || node.innerText;
    const duration = params?.duration || 1000;
    const delay = params?.delay || 0;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>_[]{}+=-*^?';
    
    // We initialize intervalId as a let because it is cleared and reassigned inside startAnimation
    let intervalId: ReturnType<typeof setInterval>;

    const startAnimation = () => {
        let iteration = 0;
        const totalIterations = targetText.length;
        
        clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            node.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (index < iteration) return targetText[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            if (iteration >= totalIterations) {
                clearInterval(intervalId);
                node.innerText = targetText;
            }

            iteration += 1 / (duration / 100);
        }, 30);
    };

    // We assign timeoutId directly to a const here to satisfy the linter
    const timeoutId = setTimeout(startAnimation, delay);

    return {
        destroy() {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        }
    };
};