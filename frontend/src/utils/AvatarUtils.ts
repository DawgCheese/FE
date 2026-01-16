class AvatarUtils {
    stringToColor(string: string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    avatar(name: string, size: string , fontSize) {
        const color = this.stringToColor(name);
        return {
            sx: {
                bgcolor: color,
                fontSize: fontSize,
                width: size,
                height: size,
                display: "gird",
                placeItems: "center"
            },
            children: `${name[0]}${name[1]}`.toUpperCase(),
        };
    }


}

export default new AvatarUtils();