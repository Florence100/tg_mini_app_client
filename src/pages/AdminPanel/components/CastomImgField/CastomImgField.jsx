import { useRecordContext } from 'react-admin';

export const CastomImgField = ({ sourse, label, style }) => {
    const record = useRecordContext(sourse);
    return record ? <img src={`${record.images[0].src}`} alt={label || "Photo"} style={style} /> : null;
}