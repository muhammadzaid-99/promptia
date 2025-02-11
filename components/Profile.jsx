import PromptCard from "@components/PromptCard"

const Profile = ({ name, desc, handleEdit, handleDelete, data }) => {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name}
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <div className='mt-16 prompt_layout'>
      {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
           handleEdit={() => handleEdit && handleEdit(post)}
           handleDelete={() => handleDelete && handleDelete(post)}
          />
      ))}
    </div>
    </section>
  )
}

export default Profile