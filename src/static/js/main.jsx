import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import obj from './data.json'
import lang from './lang.json'
import Screen from './Screen'
import Modal from './Modal';


class Main extends Component {

	state = {
		renderData: obj,
		renderLang: lang,
		renderFlip: false,
		type: [],
		title: [],
		active: -1,
		index: '',
		search: '',
		toggle: '',
		modal: true,
	}
	
	componentWillMount() {
		if (window.location.pathname === '/react-search/dist/language')
			this.handleFlip(true)
	}

	componentDidMount() {
		var renderType = this.renderTypes()
		this.setState({type: renderType[0], title: renderType[1]})
		this.shuffle(this.state.renderLang) 
		this.debounceHandleLayer = this.debounce(this.renderLayer, 2000)		
	}

	debounce(func, wait, immediate) {
		let timeout;
		return function() {
   		const later = () => {
				timeout = null;
				if (!immediate) func.apply(this, arguments)
			},
  		callNow = immediate && !timeout
  		clearTimeout(timeout)
  		timeout = setTimeout(later, wait)
  		if (callNow) func.apply(this, arguments)
    }
	}

	closeModal = () =>  {
		this.setState({ modal: false })
		document.body.classList.remove('modal')
	}

	openModal = () => {
		this.setState({ modal: true })
		document.body.classList.add('modal')
	}

	renderLayer = (search) => {
		dataLayer.push({
			'event': 'searchEvent',
			'searchValue': search
		})
	}

	shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
			counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
	}

	renderTypes() {
		var types = [], titles = []
		for (var i = 0; i < obj.length; i++) {
			if (types.indexOf(obj[i].type[0]) === -1)
				types.push(obj[i].type[0])
			if (titles.indexOf(obj[i].type[1]) === -1)
				titles.push(obj[i].type[1])
		}
		return [types, titles]
	}

	handleFilter(type) {
		var renderData = []
		for(var i = 0; i < obj.length; i++){
			if (obj[i].type[0] === type)
				renderData.push(obj[i])
		}
		return renderData
	}

	handleType = e => {
		this.setState({
			renderData: this.handleFilter(this.state.type[e]),
			active: e,
			search: '',
			toggle: ''
		})
	}

	handleFlip = page => {
		this.setState({ renderFlip: page ? true : false })	
		setTimeout(() => this.setState({ hide: page ? true : false }), 100)
		window.history.pushState(null, null, page ? 'language' : 'technology')
	}

	handleSearch = e => {
		let search = e.target.value.trim().toLowerCase(),
				index = '',
				renderData = obj,
				active = -1,
				type = ''
		
		if(search.length > 0)
			this.debounceHandleLayer(search)
			renderData = renderData.filter((item) => item.name.toLowerCase().match(search))
			if(renderData.length === 1)
				index = renderData[0].name
				if (renderData[0]) 
					active = this.state.type.indexOf(renderData[0].type[0])
				if (search.length < 2)
					active = -1
		this.setState({renderData, index, search, active})
	}

	dataLayerClick = (e, page) => {
		dataLayer.push({
			clickedItem: e,
			'event': page
		})
	}


	handleSelect = e => {
		this.dataLayerClick(e, (this.state.renderFlip) ? 'lang-event' : 'tech-event') 

		if(this.state.index === e) {
			this.setState({index: ''})
		}else{
			this.setState({index: e})
			setTimeout(() => {
				let elRect = document.querySelector('.show').getBoundingClientRect().top,
					bodyRect = document.body.getBoundingClientRect().top,
					offset = elRect - bodyRect
					window.scroll(0, offset -220)
			}, 10)
		}
	}

	handleTitle = e => {
		window.scrollTo(100, 0);
		return <h2 key={e} class='title'>{this.state.title[e]}</h2>
	}

	handleAll = () => this.setState({renderData: obj, active: -1, toggle: ''})

	handleResult = () => <h2 class='noresults'>Sorry, no results were found</h2>

	handleToggle = () => {
		this.setState({ toggle: this.state.toggle ? '' : true, search: ''})
		document.getElementById('focus').focus()
	}

	render() {
		return(
			<div>
			<Modal isOpen={this.state.modal} onClose={this.closeModal} />
			<Screen
				data={this.state.renderData}
				lang={this.state.renderLang}
				index={this.state.index}
				search={this.state.search}
				type={this.state.type}
				active={this.state.active}
				hide={this.state.hide}
				toggle={this.state.toggle}
				renderFlip={this.state.renderFlip}
				handleSearch={this.handleSearch}
				handleType={this.handleType}
				handleSelect={this.handleSelect}
				handleResult={this.handleResult}
				handleTitle={this.handleTitle}
				handleAll={this.handleAll}
				handleToggle={this.handleToggle}
				handleFlip={this.handleFlip}
				openModal={this.openModal}
			/>
			</div>
		)
	}
}

ReactDOM.render(<Main />, document.getElementById('root'))