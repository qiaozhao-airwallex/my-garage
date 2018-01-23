import React, { Component } from 'react';
import './Product.css';
import ProductItem from './ProductItem';
import ImageUpload from './ImageUpload';

const backendURL = "http://localhost:8080/image/"

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: null,
            image: null,
            productList: [
                {name: 'Football', price: '49.99', image: 'https://img.alicdn.com/bao/uploaded/i3/2647558919/TB26ksEhwxlpuFjSszbXXcSVpXa_!!2647558919.jpg_640x480Q50s50.jpg_.webp', },
                {name: 'Baseball', price: '9.99', image: 'https://img.alicdn.com/bao/uploaded/i1/2694280335/TB2sKRHbHsTMeJjy1zbXXchlVXa_!!2694280335.jpg_640x480Q50s50.jpg_.webp', },
            ]
        }
    }

    retrieveServerData = () => {
        fetch("http://localhost:8080/product", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        let payload = {
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
        };

        fetch("http://localhost:8080/product", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
            // this.props.selectImage(data.targetFileName);
            this.retrieveServerData();
            // this.setState({
            //     imagePreviewUrl: "http://localhost:8080/image/" + data.targetFileName
            // });
        })
        .catch((error) => {
            console.log(error)
        });

        // this.setState({
        //     productList: this.state.productList.concat([{
        //         name: this.state.name,
        //         price: this.state.price,
        //         image: this.state.image,
        //     }])
        // });
    }

    selectImageAbc = (originalFileName, targetFileName) => {
        this.setState({image: {
            originalFileName: originalFileName,
            targetFileName: backendURL + targetFileName}});
    }

    render() {
        return (
            <div>
                <div className="add-section">
                    <form id="add-form" onSubmit={this.onSubmit}>
                        <fieldset>
                            <div id="field">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" onChange={this.onChange}/>
                            </div>
                            <div id="field">
                                <label htmlFor="price">Price</label>
                                <input type="text" name="price" onChange={this.onChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Add</button>
                        </fieldset>
                    </form>
                    <ImageUpload selectImage={this.selectImageAbc}/>
                </div>
                <div className="display-section">
                    {this.state.productList.map((item, i) => {
                    return <ProductItem
                        key={item.image}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                    })}
                </div>
             </div>
        );
    }
}