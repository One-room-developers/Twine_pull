export function convertISOToKoreaDate(iso){
    const isoDate = new Date(iso);
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getDate()).padStart(2, '0');
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    const seconds = String(isoDate.getSeconds()).padStart(2, '0');

    const koreanDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return koreanDate;
}