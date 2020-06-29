import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../features/categoriesSlice'
import { Category } from '../components/Category'
import { isAuth } from '../features/userSlice'


export const CategoriesPage = () => {
const categories = useSelector(state=>state.categories.categories)
  const loading = useSelector(state=>state.categories.loading)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  useEffect(() => {
   dispatch(fetchCategories())
  },[])
  return (
    <div>
        {categories.length ? categories[0].map(category => {
        return <Category key={category._id} category={category}/> 
      }):<div>Loading...</div>}
    </div>
  )
}