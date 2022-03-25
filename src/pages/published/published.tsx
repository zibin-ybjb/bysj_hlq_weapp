import { Button } from '@taroify/core'
import { navigateTo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Good from "../../components/good/good";


export default function Published() {
    const goods = [
        {
            pic:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            des:'11111'
        },
        {
            pic:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            des:'222222'
        },
        {
            pic:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            des:'333333'
        },
        {
            pic:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            des:'444444'
        },
    ]
    const fabu = ()=>{
        navigateTo({
            url:"../publish/publish"
        })
    }

    return (
        <>
        11111
        {goods?.map(({pic,des})=>{
            <View>
                11111
                <Good pic={pic} des={des}></Good>
            </View>
            

        })}
         
        <Button onClick={fabu}>发布</Button>
        </>
    )

}
