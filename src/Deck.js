import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/'

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
            deck: null, 
            cards: []
        }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}new/shuffle`)
        this.setState({deck: deck.data})
    }
    async getCard(){
        let deck_id = this.state.deck.deck_id
        try{
            let cardUrl = `${API_BASE_URL}${deck_id}/draw/`
            let cardRes = await axios.get(cardUrl)
            if(!cardRes.data.success){
                throw new Error('No remaining card')
            }
            let card = cardRes.data.cards[0]
            this.setState(st => ({
                cards: [
                    ...st.cards, 
                    {
                        id: card.code, 
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        }
        catch(error){
            alert(error)
        }
    }
    render() {
        const cards = this.state.cards.map(card => (<Card name={card.name} image={card.image} key={card.id}/>))
        return (
        <div className='Deck'>
            <h1 className='Deck-title'>♣ Cards dealer ♣</h1>
            <h2 className='Deck-title sub'>Udemy course React exercice</h2>
            <button className='Deck-button' onClick={this.getCard}>New card!</button>
            <div className='Deck-cards'>{cards}</div>
        </div>
        )
    }
}
export default Deck;
