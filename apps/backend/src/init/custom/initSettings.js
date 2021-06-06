import {createSettings, findSettingsByKey} from "@dracul/settings-backend";


const settings = [
    //{key:'',value: '',label: {en: '', es:'', pt:''} },
    {
        key: 'PreparationTime',
        value: '30',
        label: {en: 'Preparation time', es: 'Tiempo de preparación', pt: 'Tempo de preparação'}
    },
    {
        key: 'IntervalTime',
        value: '10',
        label: {en: 'Interval time', es: 'Tiempo de intervalo', pt: 'Tempo de intervalo'}
    },
    {
        key: 'MessageOutOfTime',
        value: 'Lo sentimos, el local esta cerrado, podes programar el retiro de tu pedido',
        label: {en: 'Message out of time', es: 'Mensaje fuera de hora', pt: 'Mensagem fora do tempo'}
    },
]

export const initSettings = async function () {

    for (let i in settings) {
        let setting = await findSettingsByKey(settings[i].key)
        if (!setting) {
            await createSettings(null, settings[i])
        }
    }


}
