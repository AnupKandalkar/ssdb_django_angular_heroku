from django.db import models

# Create your models here.


class MoviesGenre(models.Model):
	genre = models.CharField(max_length=40, null=True, blank=True)

	def __unicode__(self):
		return self.genre

class MoviesData(models.Model):

	# movies_genre = (
 #        ('Adventure', 'Adventure'),
 #        ('Family', 'Family'),
 #        ('Family', 'Family'),
 #        ('Family', 'Family'),
 #        ('Family', 'Family'),
      
 #    )

	name = models.CharField(max_length=80, null=True, blank=True)
	director = models.CharField(max_length=80, null=True, blank=True)
	description = models.CharField(max_length=250, null=True, blank=True)
	stars = models.CharField(max_length=200, null=True, blank=True)
	ssdb_score = models.IntegerField(default=0)
	popularity = models.IntegerField(default=0)
	genre = models.ManyToManyField(MoviesGenre, related_name="moviegenre")
	create_date = models.DateField(null=True, blank=True)
	# moviepic = models.ImageField(upload_to="%Y/%m/%d", null=True, blank=True)
	# genre = models.CharField(choices=movies_genre, null=True, blank=True)


	def __unicode__(self):
		return self.name