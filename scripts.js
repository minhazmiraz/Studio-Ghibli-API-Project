const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'https://www.studioghibli.com.au/wp-content/uploads/2017/07/ghibli_logo_gold.png';
logo.setAttribute('align', 'center');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

	/* Begin accessing JSON data here */
	if(request.status>=200 && request.status<400){
		var data = JSON.parse(this.response);
		for(var i=0;i<data.length;i++){

			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			const h1 = document.createElement('h1');
			h1.textContent = data[i].title;
			
			var title = data[i].title.replace(/[^a-zA-Z]/g, "");
			var url = encodeURI('https://www.studioghibli.com.au/' 
					+ title.toLowerCase());
			//console.log(data[i].title);

			var desc = data[i].description.substring(0,300) + '.....';
			const p = document.createElement('p');
			p.textContent = desc;

			const a = document.createElement('a');
			a.setAttribute('href', url);
			a.textContent = 'more';

			container.appendChild(card);
			card.appendChild(h1);
			card.appendChild(p);
			p.appendChild(a);
		}
	} else{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	}
	//console.log(data);
}

//Send Request
request.send();
