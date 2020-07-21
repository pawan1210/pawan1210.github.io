var numsq=6;
var colors=generate(numsq);
var picked=pick();
var squares=document.getElementsByClassName("square");
var display=document.getElementById("display");
var message=document.querySelector("#message");
var h1=document.querySelector("h1");
var res=document.querySelector("#reset");
var easy=document.querySelector("#easy");
var hard=document.querySelector("#hard");

easy.addEventListener("click",function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	numsq=3;
	colors=generate(numsq);
	picked=pick();
	display.textContent=picked;
	for(var i=0;i<squares.length;i++)
	{
		if(colors[i])
		{
			squares[i].style.backgroundColor=colors[i];
		}
		else
		{
			squares[i].style.display="none";
		}
	}

})


hard.addEventListener("click",function(){
	hard.classList.add("selected");
	easy.classList.remove("selected");
	numsq=6;
	colors=generate(numsq);
	picked=pick();
	display.textContent=picked;
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor=colors[i];
		squares[i].style.display="block";
	}
})


res.addEventListener("click",function(){
	colors=generate(numsq);
	picked=pick();
	display.textContent=picked;
	message.textContent="";
	this.textContent="New Colors"
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.background=colors[i];
	}

	h1.style.background="steelblue";
})



display.textContent=picked;
for(var i=0;i<squares.length;i++)
{
	squares[i].style.background=colors[i];

	squares[i].addEventListener("click",function(){
        var clickedColor=this.style.background;
        if(clickedColor===picked)
        {
        	message.textContent="Correct";
        	h1.style.backgroundColor=clickedColor;
            res.textContent="Play Again"
        	changeColor(clickedColor);
        }
        else
        {
        	this.style.background="#232323";
        	message.textContent="Try Again"
        }
    });
}

function changeColor(color){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor=color;
	}
}
function pick(){
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generate(len)
{
	var arr=[];
	for(var i=0;i<len;i++){
       arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);
    return "rgb("+r+","+" "+g+","+" "+b+")";

}