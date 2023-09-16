import '../css/PlatesGenerator.css';
import React, {useRef} from 'react';
import { toPng } from 'html-to-image';

class PlatesGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.elementRef = React.createRef();
    }
    state = {
        vegetablePicNumber: '',
        platePicNumber: '',
    }
    randomPicNumber = (picsNumber, currentPicked) => {
        console.log('currentPicked', currentPicked)
        let number = Math.ceil(Math.random() * picsNumber);
        console.log('number before', number)
        while ((picsNumber > 1) && (number === currentPicked)) {
            number = Math.ceil(Math.random() * picsNumber);
        }
        console.log('number after', number)
        return number
    }
    generateCompostion = () => {
        const vegetablesCount = require.context('../../public/images/vegetables', false, /\.(png|jpe?g|svg)$/).keys().length;
        const platesCount = require.context('../../public/images/plates', false, /\.(png|jpe?g|svg)$/).keys().length;

        const randomVegetable = this.randomPicNumber(vegetablesCount, this.state.vegetablePicNumber);
        const randomPlate = this.randomPicNumber(platesCount, this.state.platePicNumber);

        this.setState({vegetablePicNumber: randomVegetable});
        this.setState({platePicNumber: randomPlate});
    }
    downloadComposition = () => {
        toPng(this.elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "plates_vegetables.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        if (this.state.platePicNumber && this.state.vegetablePicNumber) {
            return (
                <div className='plates-generator-wrapper'>
                    <button className='generate-button'
                            onClick={this.generateCompostion}>
                    </button>
                    <button className='download-button'
                            onClick={this.downloadComposition}>
                    </button>
                    <div className='plates-generator'
                         ref={this.elementRef}>
                        <img src={`/images/plates/plate_${this.state.platePicNumber}.png`}
                             alt='plate_picture'
                             className='plate-picture' />
                        <img src={`/images/vegetables/veg_${this.state.vegetablePicNumber}.png`}
                             alt='veg_picture'
                             className='veg-picture'/>
                    </div>
                </div>
            );
        }
        return (
            <div className='plates-generator-wrapper'>
                <button className='generate-button'
                        onClick={this.generateCompostion}>
                    Смотреть еще
                </button>
                <button className='download-button'
                        onClick={this.downloadComposition}>
                    Покупаю
                </button>
                <div className='plates-generator'>
                </div>
            </div>
        )
    }
}

export default PlatesGenerator;
