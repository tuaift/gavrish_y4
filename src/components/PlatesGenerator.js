import '../css/PlatesGenerator.scss';
import React from 'react';
import { toPng } from 'html-to-image';
import RandomImage from "./RandomImage";

class PlatesGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.elementRef = React.createRef();
    }
    state = {
        vegetablePicNumber: 1,
        platePicNumber: 1,
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
    generatePlate = () => {
        const platesCount = require.context('../../public/images/plates', false, /\.(png|jpe?g|svg)$/).keys().length;

        const randomPlate = this.randomPicNumber(platesCount, this.state.platePicNumber);

        this.setState({platePicNumber: randomPlate});
    }
    generateVegetable = () => {
        const vegetablesCount = require.context('../../public/images/vegetables', false, /\.(png|jpe?g|svg)$/).keys().length;

        const randomVegetable = this.randomPicNumber(vegetablesCount, this.state.vegetablePicNumber);

        this.setState({vegetablePicNumber: randomVegetable});
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
        return (
            <div className='plates-generator-wrapper'>
                <div className='plates-generator'
                     ref={this.elementRef}>
                    <div className='plates-generator__header'>
                        <img src='/images/logo.svg'/>
                        <div className='header__text'>
                            <div className='text-wrapper'>
                                <div className='text_1'>
                                    проект, посвященный реставрации и апсайклингу посуды советского общепита
                                </div>
                                <div className='text_2'>
                                    основу будущей коллеккции мы подбираем из личных архивов<br/>авторки и ее друзей, активно исследуем блошиные рынки и барахолки
                                </div>
                                <div className='text_3'>
                                    для каждого дропа выбирается один предмет сервировки — <br/>
                                    от граненых стаканов до суповых тарелок и чайных блюдец
                                </div>
                                <div className='text_4'>
                                    из фаянса
                                </div>
                                <div className='text_5'>
                                    «ГАВРИШ»
                                </div>
                                <div className='text_6'>
                                    первая коллекция,<br/>вдохновленная деревней,
                                </div>
                                <div className='text_7'>
                                    овощами с грядки<br/>и летом
                                </div>
                            </div>
                        </div>
                        <div className='header__text_mobile'>
                            проект, посвященный реставрации и апсайклингу<br/>
                            посуды советского общепита<br/>
                            основу будущей коллеккции<br />
                            мы подбираем из личных архивов<br/>
                            авторки и ее друзей, активно исследуем<br />
                            блошиные рынки и барахолки<br/>
                            для каждого дропа выбирается один предмет сервировки — <br/>
                            от граненых стаканов до суповых тарелок <br/>
                            и чайных блюдец из фаянса<br/>
                            «ГАВРИШ» – первая коллекция, вдохновленная<br/>
                            деревней, овощами с грядки<br/>
                            и летом
                        </div>
                    </div>
                    <div className='plates-generator__composition-container'>
                        <RandomImage imageStyle={'plate-picture'}
                                     image={ this.state.platePicNumber ? `/images/plates/plate_${this.state.platePicNumber}.png` : undefined}/>
                        <RandomImage imageStyle={'veg-picture'}
                                     image={ this.state.vegetablePicNumber ? `/images/vegetables/veg_${this.state.vegetablePicNumber}.png` : undefined}/>
                    </div>
                    <div className='plates-generator__buttons'>
                        <button className='generate-plate-button'
                                onClick={this.generatePlate}>
                            подобрать основу
                        </button>
                        <button className='generate-vegetable-button'
                                onClick={this.generateVegetable}>
                            сгенерировать принт
                        </button>
                        <button className='download-button'
                                onClick={this.downloadComposition}>
                            сохранить композицию
                        </button>
                    </div>
                   </div>
            </div>
        );
    }
}

export default PlatesGenerator;
