type Page<
    Props = {
        [key: string]: any
    }
> = React.FC<Props> & {
    path: string
}
