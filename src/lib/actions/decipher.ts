import type { Action } from 'svelte/action';

interface DecipherParams {
    text?: string;
    duration?: number;
    delay?: number;
}

export const decipher: Action<HTMLElement, DecipherParams | undefined> = (node, params) => {
    const targetText = params?.text || node.innerText;
    // Lowered default duration for a snappier feel
    const duration = params?.duration || 500; 
    const delay = params?.delay || 0;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>_[]{}+=-*^?';
    
    let intervalId: ReturnType<typeof setInterval>;

    const startAnimation = () => {
        let iteration = 0;
        
        clearInterval(intervalId);
        
        // Faster interval (20ms instead of 30ms) for smoother, faster motion
        intervalId = setInterval(() => {
            node.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (index < iteration) return targetText[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            if (iteration >= targetText.length) {
                clearInterval(intervalId);
                node.innerText = targetText;
            }

            // Fixed math: This ensures it finishes exactly in the requested duration
            iteration += targetText.length / (duration / 20);
        }, 20);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return {
        destroy() {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        }
    };
};