import React from "react";
/**
 * Square组件没有状态，只从Board接受数据，变动的时候需要Board通知，
 * 所以Square时一个controlled component
 * 像这种只有一个render方法的组件我们可以直接写成Function Component
 */
// class Square extends React.Component {

    // constructor(props){
    //     super(props);
    //     // 初始化state，可以看走时他的私有变量
    //     this.state = {
    //         value: null,
    //     }
    // }

    // render(){
    //     return (
    //         <button 
    //         className="square" 
    //         onClick={()=> this.props.onClick()}>
    //              {this.props.value} 
    //         </button>
    //     )
    // }
// }
// Function Component, those who only have render method
function Square(props) {
    return (
        <button 
        className="square" 
        onClick={()=> props.onClick()}>
                {props.value} 
        </button>
    )
}


class Board extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares : Array(9).fill(null),
    //         xIsNext: true,
    //         curStep:0,
    //         isEnded: false,
    //     }
    // }

    renderSquare(i){
        // 向下传递方法来更新当前的state里面的值
        return <Square 
            value={this.props.squares[i]} 
            onClick={()=>this.props.handleClick(i)}
        />

    }

    render(){
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
            
        )
    }
}

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares:Array(9).fill(null),
            }],
            xIsNext: true,
            isEnded: false,
            stepNumber: 0,
        }
    }

    jumpTo(move){
        // react 只会更新此处包含的属性
        this.setState({
            stepNumber:move,
            xIsNext: (move%2) === 0,
        })
    }

    handleClick(i){
        // if(this.state.isEnded) return;
        /**
         * 不这样做的目的：
         * 不变性让复杂的功能更简单的去实施，如：假设后续我们要做回退功能，那么这样操作就会更简单
         * 检测可变形的对象的变动比较麻烦，因为他们时直接更新的，需要去和之前的版本对比，不变性让我们只需要检查对象的引用和之前的 是否相同
         * 不变性让我们只需要编写纯粹的React组件
         */
        // this.state.squares[i]=status;//这样莫非不更新？
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // let isEnded = calculateWinner(squares) != null;
        if( calculateWinner(squares) || squares[i] ) return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // squares:squares,
            //concat方法不会改变原始数组，所以不用会改变原始数组的push
            history:history.concat([{
                squares:squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            // isEnded: isEnded,
        });
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];//history[history.length - 1];

        let status;
        if(this.state.stepNumber >=5){
            const winner = calculateWinner(current.squares);
            if(winner !== null){
                status = "Winner: "+ winner;
                // 不要在render里面调用setState()
            }
        }
        if(status == null){
            status = 'Next Player: '+(this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move)=>{
            const desc = move ? 
                'Go to move #'+move :
                'Go  to game start';
                // 此处会警告 each child in an array or iterator should have a unique key prop
            return <li key={move}>
                <button onClick={ ()=> this.jumpTo(move) }>{desc}</button>
            </li>
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        handleClick={ (i)=> this.handleClick(i) }
                    />
                </div>
                <div className="game-info">
                    <div>
                        { status }
                    </div>
                    <ol>
                        {moves }
                    </ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i =0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null
}

export default Game;