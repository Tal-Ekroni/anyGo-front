export const AirBnbBtn = ({ btnAction, btnInnerTxt = '' }) => {

    const getBtnDivs = () => {
        let divStr = []
        for (let i = 0; i < 100; i++) {
            divStr.push(<div key={i + 1} className="cell" ></div >)
        }
        return divStr
    }
    const onBtnAction = () => {
        btnAction()
    }
    return (
        <div className="btn-container" onClick={() => { onBtnAction() }}>
            {getBtnDivs()}
            <div className="content">
                <button className="btn"><span>{btnInnerTxt}</span> </button>
            </div>

        </div>
    )

}
