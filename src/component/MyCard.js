import React from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {FaEnvelope, FaPhone, FaAddressBook} from 'react-icons/fa';

const MyCard = (details) => {
    return(
        <Card>
            <CardBody className='text-center'>
                <img height='150' width='150' 
                    className='rounded-circle img-thumbnail border-danger'
                    src={details.details.picture?.large}
                />
            </CardBody>
            <CardTitle>
                <h2>
                    <span className='pr-2'>{details.details?.name?.title}</span>
                    <span className='pr-2'>{details.details?.name?.first}</span>
                    <span className='pr-2'>{details.details?.name?.last}</span>
                </h2>
            </CardTitle>
            <CardText>
                <FaAddressBook/> {details.details?.location?.city}
                <p>{details.details?.phone}</p>
                <FaEnvelope/> {details.details?.email}
            </CardText>
        </Card>
    )
};

export default MyCard;