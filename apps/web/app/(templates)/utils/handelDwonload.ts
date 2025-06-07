import { toPng } from "html-to-image";

export const handleDownload = async (containerRef: { current: any; }) => {
        try {

            if (!containerRef.current) return;

            const dataUrl = await toPng(containerRef.current, {
                pixelRatio: 3,
                quality: 5,
                cacheBust: true,
            });

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'finaldesign.png';
            link.click();
        } catch (error) {
            console.log(error);
        }
    };