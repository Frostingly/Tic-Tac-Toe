import './Game.css';
import React from 'react'

let game_finished = false;

function detectWinner(positions: string[]) {
    if (positions[0] === 'CROSS' && positions[3] === 'CROSS' && positions[6] === 'CROSS') return 'CROSS'
    if (positions[1] === 'CROSS' && positions[4] === 'CROSS' && positions[7] === 'CROSS') return 'CROSS'
    if (positions[2] === 'CROSS' && positions[5] === 'CROSS' && positions[8] === 'CROSS') return 'CROSS'

    if (positions[0] === 'CROSS' && positions[1] === 'CROSS' && positions[2] === 'CROSS') return 'CROSS'
    if (positions[3] === 'CROSS' && positions[4] === 'CROSS' && positions[5] === 'CROSS') return 'CROSS'
    if (positions[6] === 'CROSS' && positions[7] === 'CROSS' && positions[8] === 'CROSS') return 'CROSS'

    if (positions[0] === 'CROSS' && positions[4] === 'CROSS' && positions[8] === 'CROSS') return 'CROSS'
    if (positions[2] === 'CROSS' && positions[4] === 'CROSS' && positions[6] === 'CROSS') return 'CROSS'

    if (positions[0] === 'CIRCLE' && positions[3] === 'CIRCLE' && positions[6] === 'CIRCLE') return 'CIRCLE'
    if (positions[1] === 'CIRCLE' && positions[4] === 'CIRCLE' && positions[7] === 'CIRCLE') return 'CIRCLE'
    if (positions[2] === 'CIRCLE' && positions[5] === 'CIRCLE' && positions[8] === 'CIRCLE') return 'CIRCLE'

    if (positions[0] === 'CIRCLE' && positions[1] === 'CIRCLE' && positions[2] === 'CIRCLE') return 'CIRCLE'
    if (positions[3] === 'CIRCLE' && positions[4] === 'CIRCLE' && positions[5] === 'CIRCLE') return 'CIRCLE'
    if (positions[6] === 'CIRCLE' && positions[7] === 'CIRCLE' && positions[8] === 'CIRCLE') return 'CIRCLE'

    if (positions[0] === 'CIRCLE' && positions[4] === 'CIRCLE' && positions[8] === 'CIRCLE') return 'CIRCLE'
    if (positions[2] === 'CIRCLE' && positions[4] === 'CIRCLE' && positions[6] === 'CIRCLE') return 'CIRCLE'

    if (positions.every(position => position !== 'EMPTY')) return 'It is a tie'
}

function Game() {
    const [state, setState] = React.useState({
        game_finished: false,
        positions: [
            'EMPTY', 'EMPTY', 'EMPTY',
            'EMPTY', 'EMPTY', 'EMPTY',
            'EMPTY', 'EMPTY', 'EMPTY'
        ]
    })

    function ai(positions: string[]) {

        let number = Math.floor(Math.random() * 9);

        let availableSpaces = 0;

        for (let i = 0; i < positions.length; i++) {
            if (positions[i] === 'EMPTY') {
                availableSpaces++;
            }
        }

        if (availableSpaces > 1) {
            if (positions[number] === 'EMPTY') {
                positions[number] = 'CIRCLE'
                console.log("AI " + number)

                setState({
                    game_finished: false,
                    positions: positions
                })
            } else {
                console.log("couldn't find an empty space")
                ai(positions)
            }
        }
    }

    function takeTurn(position: number) {

        const positions = [...state.positions]

        positions[position] = 'CROSS'
        console.log("Player " + position)

        ai(positions)

        setState({
            game_finished: false,
            positions: positions,
        })
    }

    function reset() {
        setState({
            game_finished: false,
            positions: [
                'EMPTY', 'EMPTY', 'EMPTY',
                'EMPTY', 'EMPTY', 'EMPTY',
                'EMPTY', 'EMPTY', 'EMPTY'
            ],
        })
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"
        for (let i = 0; i < 9; i++) {
            //@ts-ignore
            document.getElementById("cube-" + i).style.cursor = "pointer"
        }

        winner = ''
        game_finished = false
    }

    let winner = detectWinner(state.positions)

    return (
        <div className="Game">
            <section className="grids">
                <section className="grid-1">
                    <div id="cube-outline" style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-0" position={0} value={state.positions[0]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline" style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-1" position={1} value={state.positions[1]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline" style={{ borderRight: "1px solid black" }}>
                        <Square uniqueID="cube-2" position={2} value={state.positions[2]} takeTurn={takeTurn} />
                    </div>
                </section>
                <section className="grid-2">
                    <div id="cube-outline" style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-3" position={3} value={state.positions[3]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline" style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-4" position={4} value={state.positions[4]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline" style={{ borderRight: "1px solid black" }}>
                        <Square uniqueID="cube-5" position={5} value={state.positions[5]} takeTurn={takeTurn} />
                    </div>
                </section>
                <section className="grid-3">
                    <div id="cube-outline" style={{ borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-6" position={6} value={state.positions[6]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline" style={{ borderBottom: "1px solid black" }}>
                        <Square uniqueID="cube-7" position={7} value={state.positions[7]} takeTurn={takeTurn} />
                    </div>
                    <div id="cube-outline">
                        <Square uniqueID="cube-8" position={8} value={state.positions[8]} takeTurn={takeTurn} />
                    </div>
                </section>
            </section>
            {winner && <Result winner={winner} reset={reset} />}
        </div>
    )
}

function Result({ winner, reset }: any) {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#ccc"
    for (let i = 0; i < 9; i++) {
        //@ts-ignore
        document.getElementById("cube-" + i).style.cursor = "unset"    
    }

    game_finished = true

    return (
        <div className="result">
            {winner === 'CIRCLE' && 'The AI won the game!'}
            {winner === 'CROSS' && 'You won the game!'}
            {winner === 'It is a tie' && 'It is a tie'}

            <button id="reset-button" onClick={reset}>Play Again</button>
        </div>
    )
}

class Square extends React.Component<{ uniqueID: string, position: number, value: string, takeTurn: any }, {}> {
    constructor(props: any) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (game_finished === false) {
            if (this.props.value === 'EMPTY') this.props.takeTurn(this.props.position)
        }
    }

    render() {
        return (
            <div id={this.props.uniqueID} onClick={this.handleClick}>
                {this.props.value === 'CIRCLE' && <Circle />}
                {this.props.value === 'CROSS' && <Cross />}
            </div>
        )
    }
}

function Circle() {
    return (
        <svg className="circle" width="75" height="75" viewBox="-50 -50 100 100">
            <circle cx="" cy="0" r="40" />
        </svg>
    )
}

function Cross() {
    return (
        <svg className="cross" width="75" height="75" viewBox="-50 -50 100 100">
            <line x1="-40" y1="-40" x2="40" y2="40" />
            <line x1="-40" y1="40" x2="40" y2="-40" />
        </svg>
    )
}

export default Game;