export const convertPercentageToPixels = (percentage: number, parent: number) => {
    return (percentage / 100) * parent
}

export const convertPixelToPercentage = (pixel: number, parent: number) => {
    return (pixel / parent) * 100
}