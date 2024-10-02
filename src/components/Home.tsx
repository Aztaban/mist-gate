import PostsBoard from './posts/PostsBoard';

const Home = () => {
  return (
    <>
      <section>
        <img src="src\images\front.jpg" alt="warrior" />
        <article>
          <h2>Eternal Mist</h2>
          <p>
            In ancient times, when the kingdoms of humans, elves, and dwarves
            flourished in peace and harmony, a forgotten threat rose from the
            depths of darkness. Powerful and evil forces, once imprisoned by
            ancient mages, are now breaking free under the weight of time, and
            their protective spells are weakening. You are the chosen hero, the
            last hope who can prevent the ruin and chaos spreading across the
            land. With legendary weapons and ancient magic, you must travel
            through dangerous wastelands, rekindle old alliances, and face an
            enemy that seeks the total destruction of the world.
          </p>
        </article>
      </section>

      <section>
        
        <article>
          <h2>Innovative Mechanics, Next-Gen Graphiccs</h2>
          <p>
            This epic fantasy RPG game offers a rich open world full of
            mysteries and adventure. With the freedom to create and customize
            your hero, deep story choices that shape the world, and intense
            tactical combat, the game promises countless hours of entertainment.
            Explore vast kingdoms, collect powerful artifacts, develop skills,
            and battle ancient creatures as well as dark sorcerers. Become a
            legend and influence the fate of the entire world!
          </p>
        </article>
        <img src="src\images\front2.jpg" alt="first" />
      </section>

      <section className='news-section'>
        <PostsBoard />
      </section>
    </>
  );
};

export default Home;
