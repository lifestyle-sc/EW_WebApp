export const ConvertUnixTimestampToDate = (unixTimestamp: number) => {
    return new Date(unixTimestamp * 1000);
}