import {useToast} from "primevue/usetoast";


export const useToastService  = () => {
    const toast = useToast()

    const showToast = ( severity : any, summary : string, detail : string ) => {
        toast.add({ severity: severity, summary: summary, detail: detail, closable: false, life: 3000 })
    }

    return { showToast }
}

export const formatDate = (date : Date) => {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}