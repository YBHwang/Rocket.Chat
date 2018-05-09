RocketChat.Migrations.add({
	version: 118,
	up() {
		// set user highlights on subscriptions
		RocketChat.models.Users.find({
			'settings.preferences.highlights.0': {$exists: true}
		}, {
			fields: {
				'settings.preferences.highlights': 1
			}
		}).forEach(user => {
			RocketChat.models.Subscriptions.update({
				'u._id': user._id
			}, {
				$set: {
					userHighlights: user.settings.preferences.highlights
				}
			}, {
				multi: true
			});
		});
	}
});