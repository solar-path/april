import { db } from '../db';
import { blogTable } from '../schema/blog';
import { userTable } from '../schema/users';

const blogData = [
	{
		title: 'User management',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed condimentum magna. Vivamus arcu lectus, maximus nec mi a, viverra blandit felis. Vivamus imperdiet mauris vel rutrum tempus. Fusce tempus hendrerit pretium. Proin tempor nisl mi, quis cursus sapien feugiat vel. Nunc lacinia risus in suscipit dictum. Suspendisse consequat, ligula in luctus dapibus, dui mauris elementum arcu, vitae egestas tellus justo non risus. Donec finibus lorem nec nisl auctor, non porttitor est pellentesque. Phasellus ullamcorper pretium nunc faucibus suscipit. Aenean sollicitudin sit amet nisi vitae aliquet. Quisque porta nulla lacus, eget rutrum ligula elementum eu. Maecenas tellus ipsum, elementum ut dignissim quis, facilisis id ex. Suspendisse dolor nunc, sagittis ut tempus non, egestas nec erat. Duis vitae quam nec massa rutrum placerat in non augue. Vivamus et libero ullamcorper leo pulvinar euismod non et enim. Curabitur congue aliquet turpis, at rutrum mi varius non.',
		parent: null
	},
	{
		title: 'Group structure management',
		content:
			'Proin porta odio ligula, quis consequat nisl mollis sed. Donec at nunc ut urna rutrum mattis. Aenean congue facilisis tristique. Nullam imperdiet mattis metus. Nulla maximus consequat lorem, vitae venenatis urna fermentum vel. Nunc aliquet commodo maximus. Vestibulum feugiat nec ligula non congue. Praesent sed tortor id enim sagittis egestas at a nisl. Integer hendrerit mi at risus blandit, sed pretium metus porttitor. Nunc luctus, ligula non ultrices dapibus, dolor diam dictum odio, in scelerisque velit mi ac nisl. Aenean faucibus justo vel pharetra vulputate.',
		parent: null
	},
	{
		title: 'Payments',
		content:
			'Nullam dui velit, tempus et erat id, vehicula convallis diam. Mauris vel est massa. Ut varius elementum sapien vel sagittis. Mauris facilisis sit amet nunc vitae rutrum. Etiam id malesuada felis, at ullamcorper risus. Donec non elit a justo laoreet pellentesque. Sed dictum ultrices neque. Aenean mattis purus justo, id luctus libero ultrices nec. Sed non dictum tellus, eu laoreet leo. Fusce vitae magna vehicula, auctor risus ac, aliquet enim. Suspendisse a congue felis, a cursus felis. Aliquam fringilla quis sapien eget cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit ipsum in est ultrices, in gravida est volutpat.',
		parent: null
	},
	{
		title: 'Payment initialization',
		content:
			'Integer vel accumsan erat. Nunc tempor aliquam purus vel luctus. Ut est turpis, rhoncus et euismod in, hendrerit ac enim. Sed a purus turpis. Aliquam eleifend pretium magna, sed rhoncus diam elementum a. Proin vel sapien sed lorem ornare efficitur. Nulla varius risus in libero aliquet, nec auctor lectus semper. Vestibulum ac pretium augue. Maecenas et viverra purus, egestas maximus magna. Quisque tempus diam at faucibus sollicitudin. Praesent tincidunt enim id tortor mollis, vel commodo orci rhoncus. Phasellus quis lorem sapien. Pellentesque tincidunt turpis vel odio facilisis, non sodales lacus accumsan.',
		parent: 'Payments'
	},
	{
		title: 'Payment approval',
		content:
			'Proin viverra nunc odio, sed luctus eros gravida sed. Morbi ut velit pulvinar, fringilla lectus a, dictum quam. Nam id diam quis erat molestie tincidunt non sit amet sem. Nullam nec pretium lorem, eget ultricies dui. Donec eget felis eget urna vulputate vehicula. Proin vulputate dolor id nulla ultricies, et viverra massa imperdiet. Mauris mollis lorem id est convallis vestibulum. Nunc felis massa, feugiat feugiat volutpat eget, rhoncus sit amet dolor. Maecenas non mauris luctus, rutrum leo tempor, ullamcorper nulla. Duis sit amet eros ac purus tempor sodales sed id ligula. Suspendisse lacus lectus, pharetra luctus tristique ac, feugiat semper mauris. Ut varius justo metus, sed facilisis sem posuere vel. Phasellus vestibulum tempor bibendum. In luctus vestibulum est id feugiat.',
		parent: 'Payments'
	},
	{
		title: 'Payment processing',
		content:
			'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas id pulvinar dolor. Integer in risus nec diam suscipit condimentum rutrum in nibh. Fusce lacinia vestibulum metus. Quisque vel mattis eros. Fusce mattis metus nec feugiat ullamcorper. Suspendisse feugiat leo et condimentum fringilla. Nulla pellentesque libero viverra neque mattis, ut fermentum libero finibus. Nulla metus urna, pretium vel turpis sit amet, blandit auctor felis. Donec ultrices id lectus nec ultricies. Maecenas nec mauris eu arcu facilisis volutpat et ut magna. Nam mi nisl, pellentesque sodales ipsum posuere, lacinia aliquet orci.',
		parent: 'Payments'
	},
	{
		title: 'Creation of a payment register',
		content:
			'Etiam eget imperdiet magna, et mollis felis. Mauris vehicula eros at libero aliquam pharetra. Suspendisse sit amet felis libero. Integer at sodales nulla. Nam sit amet ornare purus, et tincidunt diam. Aliquam aliquet porta orci sed scelerisque. Etiam eget leo vestibulum, semper lectus ac, scelerisque turpis. Aliquam vel quam aliquam, pellentesque purus at, pellentesque est. Sed quis elit quis lectus bibendum pellentesque. Quisque pharetra quam id nulla pharetra vehicula.',
		parent: 'Payments'
	},
	{
		title: 'Payment cancellation',
		content:
			'Morbi quis sapien vitae leo tristique cursus. Praesent ornare tortor vitae scelerisque fringilla. Nunc sodales euismod ante in rutrum. In libero ante, volutpat non scelerisque id, consectetur ut ex. Curabitur at convallis tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Nam rutrum in nunc a tempus.',
		parent: 'Payments'
	},
	{
		title: 'Payment reconciliation',
		content:
			'Sed tincidunt velit sed tortor pretium gravida a ut nisl. Suspendisse in sapien et nulla aliquet consectetur. Integer sed pretium nisl. Aliquam sit amet augue non dolor scelerisque imperdiet. Integer felis diam, malesuada vitae massa vitae, ultrices condimentum urna. Praesent eget congue nibh, sed mattis nisi. Mauris ut porta purus. Quisque sed volutpat quam. Fusce vel metus consectetur elit maximus sagittis.',
		parent: 'Payments'
	}
];

/*
 *   Seeds blog posts into the database
 *   returns blogList
 */
export const seedBlog = async () => {
	const blogList = [];

	try {
		const author = await db.select({ id: userTable.id }).from(userTable).limit(1);

		const posts = await db.select().from(blogTable);
		if (posts.length === 0) {
			console.log('start seed blog');

			for (const post of blogData) {
				const newPost = await db
					.insert(blogTable)
					.values({
						id: crypto.randomUUID(),
						title: post.title,
						content: post.content,
						coverImage: '',
						author: author[0].id,
						status: 'published',
						parentId:
							post.parent === null ? null : blogList.find((p) => p.title === post.parent)?.id, // This will be null for top-level posts
						readingFor: 'guest'
					})
					.returning();
				blogList.push(newPost[0]);
			}
			console.log('blog seed completed');
		} else {
			console.log('blog posts already seeded');
		}
	} catch (error) {
		console.error('Error seeding blog:', error);
	}
};
