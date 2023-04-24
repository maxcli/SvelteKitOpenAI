<script>
	import { marked } from 'marked';
let airesults=[]
let loading=false
let value=`Giskard, my name is **Peter** , and I live in the 21st century. Will humanity survive?`

async function search(){


    if (loading) return
        
        airesults=[]
        loading=true
        const response=await fetch('/api/openai',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "searchstring" :value
            })
        })

        if (response.ok)
        {
            try{        
                airesults =await response.json()     
            }
            catch(err)
            {
                    console.log('****** open ai error:', err )
            }
        }
        loading=false
}

</script>
<div class="grid">
Input
<textarea id="aiSearchString" bind:value></textarea>

Output
<div>{@html marked(value)}</div>

</div>
<button on:click={search}>
    Ask
</button>


 
 <ul  class="b"  >
    {#each airesults   as airesult }

        <li>
            <p>{airesult['message']['role']}>>{airesult['message']['content']}   </p> 
        </li>
      {/each}
</ul>
<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
	}
</style>