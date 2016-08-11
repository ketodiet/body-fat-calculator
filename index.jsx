/**
 * Created by ketodiet on 03/07/2016.
 *
 * This is a ReactJS test page for the KetoDiet keto-calulator.
 * see keto-diet-buddy-core.js for more info.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import core from './keto-diet-body-fat-calculator.js';

export class App extends React.Component {

    constructor() {
        super();

        this.state = {
            params: {
                gender: core.Gender.FEMALE,
                age: 35,
                triceps: 15,
                suprailiac: 15,
                umbilicus: 15,
                thigh: 15
            }
        }
    }

    updateParams(newValue) {
        this.setState({params: newValue});
    }

    updateOthers(newValue) {
        this.setState({others: newValue});
    }

	render() {

        var exampleData = {
            gender: core.Gender.FEMALE,
            age: 35,
            triceps: 15,
            suprailiac: 15,
            umbilicus: 15,
            thigh: 15
        };

        var calorieAdjustment = -15;

        var typicalBodyFat = core.KetoDietBodyFatCalculator.calculateJacksonPollockBodyFat(exampleData);

		return (
            <div>
                <h1>ReactJS demo for KetoDiet Body Fat Calculator</h1>
                <p>KetoDiet Body Fat Calculator lets you estimate your body fat percentage quickly and accurately. It's based on the Jackson & Pollock body density equations and only requires 4 measurements with a skinfold caliper.</p>
                <p>You can find out more about it and try a real-world example on the <a target="_blank" href="http://ketodietapp.com/Blog/page/body-fat-calculator">KetoDiet Body Fat Calculator</a> home page</p>

                <h2>Usage</h2>
                <div>
                    <em>If you use portions of this code on your website or any application please acknowledge the original source by linking to the <a href="https://github.com/ketodiet/body-fat-calculator">Github project</a> as shown below:</em>
                    <h4>Example</h4>
                    <div className="notice">
                        <span>Based on <a href="https://github.com/ketodiet/body-fat-calculator">KetoDiet body fat calculator</a></span>
                    </div>
                    <h4>Source HTML</h4>
                    <div className="code">
                        &lt;span&gt;Based on &lt;a href=&quot;https://github.com/body-fat-calculator&quot;&gt;KetoDiet body fat calculator&lt;/a&gt;&lt;/span&gt;
                    </div>
                </div>

                <h2>Typical Example</h2>
                <div>Macronutrient calculation for:
                    <ul>
                        <li>{exampleData.age} year old female,</li>
                        <li>Skin calliper reading on triceps: {exampleData.triceps} mm,</li>
                        <li>Skin calliper reading on suprailiac: {exampleData.suprailiac} mm,</li>
                        <li>Skin calliper reading on umbilicus: {exampleData.umbilicus} mm,</li>
                        <li>Skin calliper reading on thigh: {exampleData.thigh} mm,</li>
                    </ul>
                    Calculated body fat percentage: <span>{typicalBodyFat}%</span>
                </div>

                <h3>Code</h3>
                <div className="code">
                    <pre>
                        var exampleData = &#123;{"\n"}
                        {"\t"}gender: core.Gender.FEMALE,{"\n"}
                        {"\t"}age: {exampleData.age},{"\n"}
                        {"\t"}triceps: {exampleData.triceps},{"\n"}
                        {"\t"}suprailiac: {exampleData.suprailiac},{"\n"}
                        {"\t"}umbilicus: {exampleData.umbilicus},{"\n"}
                        {"\t"}thigh: {exampleData.thigh},{"\n"}
                        &#125;;{"\n"}

                        var bodyFat = core.KetoDietBodyFatCalculator.calculateJacksonPollockBodyFat(exampleData);{"\n"}
                    </pre>
                </div>

                <h2>Try it for yourself - enter your own data</h2>
                <InputForm params={this.state.params}
                           others={this.state.others} updateParams={this.updateParams.bind(this)} updateOthers={this.updateOthers.bind(this)}/>
                <h3>Results</h3>
                <Results params={this.state.params}
                         others={this.state.others}/>
            </div>
		);
	}
}

class InputForm extends React.Component {

    updateGender(newValue) {
        this.props.params.gender = (newValue === core.Gender.MALE) ? core.Gender.MALE : core.Gender.FEMALE;
        this.props.updateParams(this.props.params);
    }
    updateAge(newValue) {
        this.props.params.age = newValue;
        this.props.updateParams(this.props.params);
    }
    updateTriceps(newValue) {
        this.props.params.triceps = newValue;
        this.props.updateParams(this.props.params);
    }
    updateSuprailiac(newValue) {
        this.props.params.suprailiac = newValue;
        this.props.updateParams(this.props.params);
    }
    updateUmbilicus(newValue) {
        this.props.params.umbilicus = newValue;
        this.props.updateParams(this.props.params);
    }
    updateThigh(newValue) {
        this.props.params.thigh = newValue;
        this.props.updateParams(this.props.params);
    }

    render() {
        return (
            <form>
                <InputFormGenderField fieldId="gender" value={this.props.params.gender} updateValue={this.updateGender.bind(this)} />
                <InputFormNumberField fieldId="age" title="Age" value={this.props.params.age} updateValue={this.updateAge.bind(this)} />
                <InputFormNumberField fieldId="triceps" title="Triceps (mm)" value={this.props.params.triceps} updateValue={this.updateTriceps.bind(this)} />
                <InputFormNumberField fieldId="suprailiac" title="Suprailiac (mm)" value={this.props.params.suprailiac} updateValue={this.updateSuprailiac.bind(this)} />
                <InputFormNumberField fieldId="umbilicus" title="Umbilicus (mm)" value={this.props.params.umbilicus} updateValue={this.updateUmbilicus.bind(this)} />
                <InputFormNumberField fieldId="thigh" title="Thigh (mm)" value={this.props.params.thigh} updateValue={this.updateThigh.bind(this)} />
            </form>
        );
    }
}

class InputFormGenderField extends React.Component {
    update(event) {
        try {
            var newValue = parseInt(event.target.value);
            this.props.updateValue(newValue);
        } catch(ex) {
            console.error(ex);
        }
    }

    render() {
        var idFemale = this.props.fieldId + "_female";
        var idMale = this.props.fieldId + "_male";

        return (
            <div>
                <input type="radio" name={idFemale}
                       value={core.Gender.FEMALE}
                       checked={this.props.value === core.Gender.FEMALE}
                       onChange={this.update.bind(this)}
                />
                <label for={idFemale}>Female</label>

                <input type="radio" name={idMale}
                       value={core.Gender.MALE}
                       checked={this.props.value === core.Gender.MALE}
                       onChange={this.update.bind(this)} />
                <label for={idMale}>Male</label>
            </div>
        );
    }
}

class InputFormNumberField extends React.Component {

    update(event) {
        try {
            var newValue = parseFloat(event.target.value);
            this.props.updateValue(newValue);
        } catch(ex) {
            console.error(ex);
        }
    }

    toNumber(value) {
        return isNaN(value) || value === undefined ? 0 : value;
    }

    render() {
        return (
            <div>
                <label for={this.props.fieldId}>{this.props.title}</label>
                <input type="text" name={this.props.fieldId} value={this.toNumber(this.props.value)} onChange={this.update.bind(this)}/>
            </div>
        );
    }
}

class Results extends React.Component {
    render() {

        try {
            var bodyFat = core.KetoDietBodyFatCalculator.calculateJacksonPollockBodyFat(this.props.params);

            return (
                <div>
                    <span>Body fat percentage {bodyFat}%</span>
                </div>
            )
        } catch (ex) {
            return (
                <div>
                    <textarea readOnly cols="64" rows="42" value={ex} />
                </div>
            )
        }
    }
}

ReactDOM.render(<App/>, document.querySelector("#app"));
