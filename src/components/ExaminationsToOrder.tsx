import CancellingButton from './CancellingButton'
import Label from './Label'

export default function ExaminationsToOrder({title, itemList, callBack}) {
    

    return (
        <Label
            name={title}
            value={itemList.length != 0 &&
                itemList?.map((item) => (
                    <CancellingButton
                        key={item.code}
                        buttonText={item.name}
                        onClick={() => {
                            callBack(item)
                        }}
                    />
                ))}
        />
    )
}
