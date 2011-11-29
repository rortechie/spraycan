collection @files

attributes :id, :name

code :url do |g|
  g.url
end

code :image do |g|
  g.image?
end
