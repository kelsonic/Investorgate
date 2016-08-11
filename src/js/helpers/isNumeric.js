export default function isNumeric(input) {
    return (input - 0) == input && ('' + input).trim().length > 0;
}