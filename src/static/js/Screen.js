import React from 'react' 

const Screen = (props) => {

	const renderTech = () => {
		return(
			<ul class='data'>
				{props.data.map((item, i) =>
				<li onClick={props.data.length > 1 ? e => props.handleSelect(item.name) : null} 
					key={item.name}
					class={item.name === props.index ? 'show' : ''}>
					<h2>{item.name}</h2>
					<img class='small-img' src={`static/img/${item.name.toLowerCase()}.jpg`} />
					<div class='info'>{item.info}
						<a 
							class='list' 
							onClick={e => e.stopPropagation()} 
							target='_blank' 
							href={item.url}>
							{item.url}
						</a>
						<a 
							onClick={e => e.stopPropagation()} 
							target='_blank' 
							href={item.url}>
							<img src={`static/img/${item.name.toLowerCase()}.jpg`} />
						</a>
					</div>
				</li>
				)}
			</ul> 
		)
	}

	const renderOptions = () => {
		return <ul class='options'>
				<li class={ props.active === -1 ? 'active' : ''} onClick={() => props.handleAll()}>All</li>
				{props.type.map((el, i) =>
				<li 
					class={ props.active === i ? 'active' : ''} 
					key={el} 
					onClick={() => props.handleType(i)}>{el}
				</li>
			)}
		</ul>
	}

	return (
		<div>
			<div class='box'>
				<span class='about' onClick={e => props.openModal()}></span>
				<h1>Web Developement</h1>
				{!props.renderFlip ? <span class='search' onClick={e => props.handleToggle()}></span> : null }
				{!props.renderFlip ? <div class="input-box">
					<p class='line'></p>
					<input 
						id="focus" class={props.toggle ? 'show-toggle' : 'hidden'} 
						type='text' 
						placeholder='Search all technologies' 
						value={props.search} 
						onChange={props.handleSearch} />
					</div>
				: null }
				<form class="form">
    			<div class="switch-field">
      			<input 
      				type="radio" 
      				id="switch_tech" 
      				name="switch_2" 
      				value="yes" 
      				defaultChecked={!props.renderFlip ? 'checked' : null} 
      				onChange={e => props.handleFlip(false)} />
      			<label for="switch_tech">Technologies</label>
      			<input 
      				type="radio" 
      				id="switch_lang" 
      				name="switch_2" 
      				value="no"  
      				defaultChecked={props.renderFlip ? 'checked' : null}
      				onChange={e => props.handleFlip(true)}/>
      			<label for="switch_lang">Languages</label>
    			</div>
    		</form>
				{!props.renderFlip ? renderOptions() : null}
			</div>
			{!props.data.length && !props.renderFlip ? props.handleResult() : null}
			<div class={'flip-container ' + (props.renderFlip ? 'languages' : '')}>
				<div class="flipper">
					<div class={'front ' + (props.hide ? 'hideit' : '')}>
						<div class={'data-box ' + (props.toggle ? 'open' : '')}>
							{props.type.map((el, i) => props.active == i ? props.handleTitle(i) : null)}
							{props.data.length ? renderTech() : null}
						</div>
					</div>
					<div class="back">
						<div class={'data-box lang ' + (props.toggle ? 'open' : '')}>
							<h2 class='title'>Web Programming languages</h2>
							<ul class='data'>
								{props.lang.map((item, i) =>
								<li onClick={props.lang.length > 1 ? e => props.handleSelect(item.name) : null} 
									key={item.name}
									class={item.name === props.index ? 'show' : ''}>
									<h2>{item.name}</h2>
									<img class='small-img' src={`static/img/${item.name.toLowerCase().replace('#', '')}.jpg`} />
									<div class='info'>{item.info}
										<a 
											class='list' 
											onClick={e => e.stopPropagation()} 
											target='_blank' 
											href={item.url}>
											{item.url}
										</a>
										<a 
											onClick={e => e.stopPropagation()} 
											target='_blank' 
											href={item.url}>
											<img src={`static/img/${item.name.toLowerCase().replace('#', '')}.jpg`} />
										</a>
									</div>
								</li>
								)}
							</ul>
						</div>
					</div> 
				</div>
			</div>
		</div>
	)
}

export default Screen