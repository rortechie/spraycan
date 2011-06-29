collection @templates => nil

attributes :id

code :name do |t|
  t[0]
end

code :hooks do |t|
  t[1][:hooks]
end
