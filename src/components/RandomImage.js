function RandomImage({ image, imageStyle }) {
    if (image) {
        return (
            <img src={image}
                 className={imageStyle} />
        );
    } else {
        return (
            <div className={imageStyle}>
            </div>
        )
    }
}

export default RandomImage;
