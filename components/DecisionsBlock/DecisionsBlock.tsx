import s from './decisionsblock.module.scss'

export default function DecisionsBlock({commentText, children}:any) {
  return(
    <div className={s.decisionsBlock}>
      <h1 className={s.commentText}>Решения для замечания {commentText}</h1>
      {children}
    </div>
  )
}