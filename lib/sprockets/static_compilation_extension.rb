Sprockets::StaticCompilation.module_eval do
  alias_method :sprockets_find_asset_in_static_root, :find_asset_in_static_root

  def find_asset_in_static_root(logical_path)
    pathname   = Pathname.new(static_root.join(logical_path))
    attributes = attributes_for(pathname)

    case attributes.format_extension
      when ".css"
        debugger
        record = DefaceEditor::Stylesheet.where(:name => logical_path.to_s).first
      when ".js"
        record = DefaceEditor::Javascript.where(:name => logical_path.to_s).first
      else
        record = DefaceEditor::Graphic.where(:name => logical_path.to_s).first
    end

    if record
      Sprockets::ActiveRecordAsset.new(self, logical_path, pathname, record) 
    else
      sprockets_find_asset_in_static_root(logical_path)
    end
  end
end
