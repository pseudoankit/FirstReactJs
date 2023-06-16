import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {faker} from '@faker-js/faker'
import {Container, Col, Row} from 'reactstrap'

const apiKey = "T1YkPzsYsgIjkK2icnbS3bMIBt0z1VN8oL8SKQLZCcDyyRqqOSb55aYi"
const url  = "https://api.pexels.com/v1/search?query=laptop/"
const localUrl = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"

const BuyPage = ({addInCart}) => {
    const [product, setProduct] = useState([]);
    const fetchPhotos = async () => {
        const {data} = await Axios.get(url,{
            headers: {
                Authorization:apiKey
            }
        });
        const {photos} = data;
        const allProduct = photos.map(photo => ({
            smallImage: photo.src.medium,
            tinyImage : photo.src.tiny,
            productName: faker.commerce.product(),
            productPrice: faker.finance.amount(),
            id: faker.datatype.uuid()
        }))
        console.log(allProduct)
        setProduct(allProduct)
    }

    useEffect(() => {
        fetchPhotos()
    }, [])

    return (
        <Container>
            <h1>
                Buy Page
            </h1>
        </Container>
    )
}

export default BuyPage;
