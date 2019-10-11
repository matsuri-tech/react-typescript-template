// Support Images
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"

// Page
type Page<Props = {}> = React.FC<Props> & {
    path: string
}
