import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {fetchWords, fetchSingleWord, setWordNull} from '../features/wordsSlice'
import {useSelector, useDispatch} from 'react-redux'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Container, Row, Col
  } from 'reactstrap';

export const SingleWord = () => {
    const words = useSelector(state=>state.words.words)
    const word = useSelector(state=>state.words.word)
    const loading = useSelector(state=>state.words.loading)
    
    const dispatch = useDispatch()
    let {name} = useParams()
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const isAuth = useSelector(state=>state.user.isAuthenticated)
    const role = useSelector(state=>state.user.role)
    const history = useHistory()
    useEffect(() => {
        dispatch(fetchSingleWord(name))
        return () => {
            dispatch(setWordNull())
        }
    },[])
    const learnButtonClicked = (e) => {
        if (!isAuth) {
            e.preventDefault()
            history.push('/register')
        }
    }
    return (
        <Row className="d-flex h-100 justify-content-center">
            {loading===false ? 
            
            <Col className="pt-md-5 pt-3" md="6">
                 <Card>
                 <CardBody className="">
                   <CardTitle className="text-center">{word.name} - {word.definition}</CardTitle>
                   <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                   <div className="d-flex justify-content-center">
                   <Button color="success" onClick={(e) => learnButtonClicked(e)}>Learn</Button>
                   </div>
                 </CardBody>
               </Card>
            </Col>
            
             : <div>Loading....</div> }
        </Row>
    )
}