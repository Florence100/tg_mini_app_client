import { useRecordContext } from 'react-admin';

export const CastomImgField = ({ source, label, style }) => {
    const record = useRecordContext(source);
    return record ? <img src={`${record.images[0].src}`} alt={label || "Photo"} style={style} /> : null;
}