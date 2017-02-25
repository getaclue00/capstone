class AddIndexServiceDisplayable < ActiveRecord::Migration[5.0]
   def up
    add_index      :services, :displayable
  end

  def down
    remove_index   :services, :displayable
  end
end
