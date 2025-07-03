interface Props {
    src: string;
    alt: string;
}

const ImageDisplay = ({ src, alt }: Props) => (
    <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-lg shadow-sm"
    />
);

export default ImageDisplay;
